// routes/cart.jsx
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store2/userSlice.js";
import { changeCount } from "./../store";
import { memo, useMemo, useState } from "react";

function Cart() {
  let a = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);
  return (
    <>
      <h6>
        {a.user.name}の買い物リスト（年齢: {a.user.age}）
      </h6>

      <Table>
        <thead>
          <tr>
            <th>名前</th>
            <th>商品名</th>
            <th>量</th>
            <th>変換</th>
          </tr>
        </thead>
        <tbody>
          {a.product.map((item, i) => (
            <tr key={i}>
              <td>{a.user.name}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>-</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeCount(item.id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default Cart;
