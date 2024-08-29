import { isValidElement, ReactNode } from 'react';

export const formatText = (text: string): ReactNode => {
  const lines = text.split('\n');

  const formattedLines = lines.map((line, index) => {
    if (line.startsWith('* **')) {
      const parts = line.split('**');
      return (
        <span key={`bold-${index}`}>
          <strong>{parts[1]}</strong>
          {parts[2]}
        </span>
      );
    } else if (line.startsWith('* ')) {
      return <li key={`li-${index}`}>{line.slice(2)}</li>;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      return <h3 key={`h3-${index}`}>{line.slice(2, -2)}</h3>;
    } else if (line.trim() === '') {
      return <br key={`br-${index}`} />;
    } else {
      // 最後の選択肢として <p> タグを使用しますが、他のブロック要素は含めません。
      return (
        <div key={`div-${index}`}>
          <p>{line}</p>
        </div>
      );
    }
  });

  const formattedContent: ReactNode[] = [];
  let currentList: ReactNode[] = [];

  for (let i = 0; i < formattedLines.length; i++) {
    const element = formattedLines[i];
    if (isValidElement(element) && element.type === 'li') {
      currentList.push(element);
    } else {
      if (currentList.length > 0) {
        formattedContent.push(<ul key={`ul-${i}`}>{currentList}</ul>);
        currentList = [];
      }
      formattedContent.push(element);
    }
  }

  if (currentList.length > 0) {
    formattedContent.push(<ul key={`ul-last`}>{currentList}</ul>);
  }

  return <>{formattedContent}</>;
};
