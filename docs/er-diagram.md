```mermaid
erDiagram
    USER ||--o{ CHAT : userId
    USER {
      Int id
      string fullName
      string email
      string postalCode
    }
    CHAT {
      Int id
      Int userId
      string location
      Int score
      string time_stamp
    }
    CHAT ||--|| MESSAGE : chatId
    MESSAGE {
      Int id
      string content
      string sender
      string time_stamp
    }
```
