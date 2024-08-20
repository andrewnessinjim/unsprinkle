import React from "react";
import styled from "styled-components/macro";

const MIME_TYPES_EXTENSIONS = {
  "image/avif": [
    { extension: ".avif", xDescriptor: "" },
    { extension: "@2x.avif", xDescriptor: "2x" },
    { extension: "@3x.avif", xDescriptor: "3x" },
  ],
  "image/jpeg": [
    { extension: ".jpg", xDescriptor: "" },
    { extension: "@2x.jpg", xDescriptor: "2x" },
    { extension: "@3x.jpg", xDescriptor: "3x" },
  ],
};

const PhotoGridItem = ({ id, src, alt, tags }) => {
  const srcExtensionRemoved = src.replace(".jpg", "");

  return (
    <article>
      <Anchor href={`/photos/${id}`}>
        <picture>
          {Object.keys(MIME_TYPES_EXTENSIONS).map((mimeType) => {
            const srcSetArray = [];

            for(const mimeExtension of MIME_TYPES_EXTENSIONS[mimeType]) {
              srcSetArray.push(
                `${srcExtensionRemoved+mimeExtension.extension} ${mimeExtension.xDescriptor}`
              )
            }

            return <source type={mimeType} srcSet={srcSetArray.join(", ")}/>;
          })}
          <Image src={src} alt={alt} />
        </picture>
      </Anchor>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </article>
  );
};

const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
  outline-offset: 4px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 300px;
  border-radius: 2px;
  margin-bottom: 8px;
  object-fit: cover;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.li`
  padding: 4px 8px;
  background: var(--color-gray-300);
  font-size: 0.875rem;
  font-weight: 475;
  color: var(--color-gray-800);
`;

export default PhotoGridItem;
