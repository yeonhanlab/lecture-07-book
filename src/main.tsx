import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
);

// 1. 코드는 정상이야 => 값이 잘 나올 때가 있어
// 2. 똑같은 내용으로 테스트를 여러 번 진행을 해봤는데 가끔 오류 날 때가 있음 (개발 중일 때만 오류가 남)
// => 지금은 vite를 이용해 개발하지만 개발이 끝나면 빌드를 거쳐서 사용자들에게 배포할때는 에러 안남

// => 데이터를 외부에서 받아올 때
// => 이 이유는 main.tsx의 "Strict Mode"
// Strict Mode는 React가 개발 중일 때 개발을 도와주기 위해서 만들어놓은 모드
// 이 Strict Mode의 기능중 하나는 데이터를 외부에서 받아올 때 실패가 될 때를 대비해서 여러 번 request를 보내게 됨
// 받는 서버 입장에서는 똑같은 IP에 똑같은 API를 똑같은 내용을 담아 여러 번 도착되는 상황
// 당연히 받는 서버는 거부처리를 하게 됨 => 공격으로 생각을 함
