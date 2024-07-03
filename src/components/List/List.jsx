import React from 'react'
import Button from '../Button/Button';

export default function List({list, showBtns, handleBtnClick}) {

  return (
    <ul>
        {list.length > 0 ?
            list.map((item) => (
                <li key={item.id}>
                    <div>
                        {item.name} {item.age} 
                    </div>
                    {showBtns ? 
                        <div>
                            <Button btnText="More" handleClick={handleBtnClick} value={item.id} />
                            <Button btnText="Edit" handleClick={handleBtnClick} value={item.id} />
                            <Button btnText="Delete" handleClick={handleBtnClick} value={item.id} />
                        </div>
                        : null
                    }
                </li>
            ))
            : <div>Adopt a Dog</div>
        }
    </ul>
  )
}
