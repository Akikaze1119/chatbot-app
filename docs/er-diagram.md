```mermaid
erDiagram
    USER ||--o{ CHAT : userId
    USER {
      Int id
      string name
      string email
      string phone
      string postal_code
    }
    CHAT {
      Int id
      Int userId
      string location
      Int score
      timestamp time_stamp
    }
    CHAT ||--|| MESSAGE : chatId
    MESSAGE {
      Int id
      string content
      string sender
      timestamp time_stamp
    }
```
