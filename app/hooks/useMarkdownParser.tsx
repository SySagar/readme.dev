import { dataType } from "@app/develop/page";
import { useState, useEffect, use } from "react";

interface FieldStyle {
  color: string;
  fontWeight: string;
  marginTop: string;
  marginBottom: string;
  marginLeft?: string;
  maxWidth?: string;
}

const useMarkdownParser = (formData: dataType) => {
  console.log(JSON.stringify(formData));
  const [markdownContent, setMarkdownContent] = useState("Your markdown will appear here...");

  const generateField = (
    value: string,
    prefix: string,
    style: FieldStyle,
    prefixSpacing: number = 1
  ) => {
    if (!value) return ""
    const spacer = "\u00A0".repeat(prefixSpacing) // Non-breaking space

    const containerStyle = `
      display: flex;
      align-items: flex-start;
      margin-top: ${style.marginTop};
      margin-bottom: ${style.marginBottom};
      max-width: ${style.maxWidth};
    `
    const iconStyle = `
      flex-shrink: 0;
      margin-right: 8px;
      white-space: nowrap;
    `
    const contentStyle = `
      flex-grow: 1;
      color: ${style.color};
      font-weight: ${style.fontWeight};
      max-width: ${style.maxWidth};
      word-wrap: break-word;
      text-align: left;
    `

    return `
<div style="${containerStyle}">
${spacer}
  <div style="${iconStyle}">${prefix}</div>
  <p style="${contentStyle}">${value}</p>
</div>`
  }

  useEffect(() => {
    const generateMarkdown = () => {
      const content = `
  # ${formData.firstName}
  ${generateField(
    formData.description,
    "⤷",
    {
      color: "#6b7281",
      fontWeight: "300",
      marginTop: "0",
      marginBottom: "8px",
      marginLeft: "15px",
      maxWidth: "300px",
    },
    12
  )}
  
  ${generateField(
    formData.location,
    "⚐",
    {
      color: "#DBEAFE",
      fontWeight: "100",
      marginTop: "4px",
      marginBottom: "4px",
    },
    2
  )}
  
  ${generateField(
    formData.currentlyBuilding,
    "ϟ",
    {
      color: "#DBEAFE",
      fontWeight: "100",
      marginTop: "4px",
      marginBottom: "0",
    },
    2
  )}
        `.trim();

      setMarkdownContent(content);
    };

    if(Object.keys(formData).length > 0 && Object.values(formData).some((val) => val !== "")){
      generateMarkdown();
    }
    else
    {
      setMarkdownContent("Your markdown will appear here...");
    }

  }, [formData]);



  useEffect(() => {
    

  }, [markdownContent]);



  return markdownContent;
};

export default useMarkdownParser;
