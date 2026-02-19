import React from 'react'

const FunctionComponent = () => {
    const [name, setName] = useState('Aloha')
    
    const handleClick = (newName) => {
        console.log(`${newName} Click!`);
        //상태 업데이트
        setName(newName);
    }

  return (
    <div>
        <h1>함수형 컴포넌트</h1>
        <h2>Hello Im {name}</h2>
        <button onClick={() => handleClick('Aloha')}>Aloha</button>
        <button onClick={()=> handleClick('Joeun')}>Joeun</button>
    </div>
  )
}

export default FunctionComponent