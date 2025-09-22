## 組件的層級關係
```js
<ChatRoom />   // 聊天室
├── <Header />               
├── <MessageList />           // 訊息清單
│     ├── <MessageItem />     // 單則訊息
│     │      ├── <Avatar />   // 頭像
│     │      └── <MessageBubble /> // 訊息文字 + 已讀狀態
│     └── <TypingIndicator /> // 對方輸入中提示
└── <InputBar />              // 輸入框
       ├── <TextInput />      // 文字輸入
       └── <SendButton />     // 送出按鈕 
```



## state 管理

### state 範例
```js
const [messages, setMessage] = useState([
  { id: 1, sender: 'me', text: 'Hello', read: true, timestamp: 1663312000 },
  { id: 2, sender: 'other', text: 'Hi!', read: false, timestamp: 1663312100 }
])
const [isTyping, setIsTyping] = useState(false)
```

### state 傳遞
```js

InputBar  
 ├── onChange → setInputValue → webSocket → setIsTyping
 └── onSubmit → 呼叫 onSendMessage() → MessageList


messages 全部訊息
      ↓ props
MessageList → MessageItem → MessageBubble (顯示訊息 + 已讀/未讀狀態)


isTyping (對方正在輸入…)
     ↓ props
TypingIndicator (顯示提示文字)


messages.read
     ↓ props
MessageItem (顯示已讀狀態)
```