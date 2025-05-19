// routes/cart.jsx
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
function Cart() {
  let a = useSelector((state) => {
    return state;
  });
  return (
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
        {a.product.map((product, i) => (
          <tr key={i}>
            <td>{a.user}</td>
            <td>{product.name}</td>
            <td>{product.count}</td>
            <td>-</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default Cart;
