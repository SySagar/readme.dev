import { dataType } from "@app/develop/page"
import { useState, useEffect } from "react";
import marked from 'marked'
import { LocateIcon } from "lucide-react";

const useMarkdownParser = (formData: dataType) => {
    console.log(JSON.stringify(formData))
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        const generateMarkdown = () => {
            
            let name = `# ${formData.firstName || ''}`
            const location = formData.location
        ? `<p style="font-weight:100; color: gray;">⚐ ${formData.location}</p>`
        : "";

      const working = formData.currentlyBuilding
        ? `<p  style="font-weight:100; color: gray;">ϟ  ${formData.currentlyBuilding}</p>`
        : "";

      const description = formData.description
        ? `<p style:"font-weight: light;  color: gray;">⤷  ${formData.description}</p>`
        : "";

      const content = `${name}\n${description}\n\n${location}\n\n${working}`;

      
        setMarkdownContent(content);
        }
        generateMarkdown();
    
    //   return () => {
    //     second
    //   }
    }, [formData])

    return markdownContent;
    

}

export default useMarkdownParser;