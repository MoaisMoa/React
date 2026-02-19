import React, { useState } from 'react' // 1. { useState } 추가

const ProductDetail = () => {

    // 상품 객체 정의
    const product = {
        id      : "p0001",
        name    : "모니터" ,
        price   : 220000,
        quantity: 1,
        img     : "https://i.imgur.com/RBP3TVG.png"
    }

    // state 선언
    const [quantity, setQuantity] = useState(product.quantity)

    // 최종 가격 계산
    const total = product.price * quantity

    // +, - 이벤트 핸들러
    const increase = () => {
        setQuantity(quantity + 1)
    }

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    // 직접 입력 시 상태 반영을 위한 핸들러 (선택 사항)
    const handleQuantityChange = (e) => {
        const val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) {
            setQuantity(1);
        } else {
            setQuantity(val);
        }
    }

  return (
    <div className='product-detail'>
        <div className="item img">
            <img src={product.img} alt={product.name} />
        </div>
        <div className="item info">
            <div className="title">
                <h1>{product.name}</h1>
            </div>
            <p>
                <span className='txt-pt'>INFO</span>  <br />
                - 세로로 볼 수 있는 독특한 모니터 디자인 <br />
                - 상단, 하단을 분리하여 멀티 태스킹 가능 <br />
            </p>
            <p>
                <span className="txt-pt">Color</span> <br />
                Black, White <br />
            </p>
            <span className="line-lg"></span>
            <div className="text-group">
                <div className="item">
                    <span className="txt-pt">판매가</span>
                </div>
                <div className="item">
                    <div className="txt-pt">{product.price.toLocaleString()} 원</div>
                </div>
            </div>
            <div className="text-group">
                <div className="item">
                    <span>수량</span>
                </div>
                <div className="item flex">
                    {/* onChange를 추가하여 직접 입력도 가능하게 수정했습니다 */}
                    <input 
                        type="number" 
                        className='quantity'
                        min={1} 
                        max={100} 
                        value={quantity} 
                        onChange={handleQuantityChange}
                    />
                    <button className="btn btn-xs" onClick={increase}>+</button>
                    <button className="btn btn-xs" onClick={decrease}>-</button>
                </div>
            </div>
            <span className="line-lg"></span>
            <div className="text-group">
                <div className="item">
                    <span className="txt-pt">최종가격</span>
                </div>
                <div className="item">
                    <span className="txt-pt">
                        {total.toLocaleString()} 원
                    </span>
                </div>
            </div>
            <div className="text-group flex gap-1">
                <div className="item">
                    <button className="btn btn-lg">구매하기</button>
                </div>
                <div className="item flex">
                    <button className="btn btn-lg btn-outline">장바구니</button>
                    <button className="btn btn-lg btn-outline">관심상품</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail