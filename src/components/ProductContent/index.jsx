import React from "react";
import DOMPurify from "dompurify";

const ProductContent = ({ content }) => {
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default ProductContent;
