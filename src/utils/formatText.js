import React from 'react';

export const formatText = (text) => {
  const lines = text.split('\n');

  // Format the text into React elements
  const formattedLines = lines.map((line, index) => {
    if (line.startsWith('* **')) {
      // Handle lines starting with * ** as bold text without wrapping in a list item
      const parts = line.split('**');
      return (
        <p key={index}>
          <strong>{parts[1]}</strong>
          {parts[2]}
        </p>
      );
    } else if (line.startsWith('* ')) {
      // Handle regular list items
      return <li key={index}>{line.slice(2)}</li>;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      return <h3 key={index}>{line.slice(2, -2)}</h3>;
    } else if (line.trim() === '') {
      return <br key={index} />;
    } else {
      return <p key={index}>{line}</p>;
    }
  });

  // Group list items into unordered lists
  const formattedContent = [];
  let currentList = [];

  // Loop through the formatted lines and group list items into unordered lists
  for (let i = 0; i < formattedLines.length; i++) {
    const element = formattedLines[i];
    if (React.isValidElement(element) && element.type === 'li') {
      currentList.push(element);
    } else {
      if (currentList.length > 0) {
        formattedContent.push(<ul key={formattedContent.length}>{currentList}</ul>);
        currentList = [];
      }
      formattedContent.push(element);
    }
  }

  // Add the last list if there are any list items left
  if (currentList.length > 0) {
    formattedContent.push(<ul key={formattedContent.length}>{currentList}</ul>);
  }

  return <div>{formattedContent}</div>;
};
