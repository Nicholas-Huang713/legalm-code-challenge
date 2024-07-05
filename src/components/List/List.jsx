import Button from "../Button/Button";
import "./List.scss";

export default function List({ list, handleBtnClick }) {
  return (
    <div className="list-container">
      <ul className="list-wrapper">
        {list.length > 0 ? (
          list.map((item) => (
            <li key={item.id} className="list-item">
              <div className="list-content">
                <div>
                  <strong>{item.name}</strong>
                </div>
                <div>Exp: {item.exp}yrs</div>
                <div>
                  <Button
                    btnText="X"
                    handleClick={handleBtnClick}
                    value={item.id}
                  />
                </div>
              </div>
              <div className="list-btn-wrapper">
                <Button
                  btnText="Details"
                  handleClick={handleBtnClick}
                  value={item.dogId}
                />
                <Button
                  btnText="Edit"
                  handleClick={handleBtnClick}
                  value={item.id}
                />
              </div>
            </li>
          ))
        ) : (
          <div>Adopt a Dog</div>
        )}
      </ul>
    </div>
  );
}
