import React, { useState } from "react";
function TableRows({ rows, tableRowRemove, onValUpdate, setIsEdit }) {  
  return rows.map((rowsData, index) => {
    const { msv, hoten, ngaysinh, quequan, isEdit = true, firstEdit = false} = rowsData;
    return (
      <tr key={index}>
        <td>
          <var>{index + 1}</var>
        </td>
        {isEdit ? (
          <>
            {!firstEdit ? (
            <td>
            <input
              type="text"
              value={msv}
              onChange={(event) => onValUpdate(index, event)}
              name="msv"
              className="form-control" />
          </td>
          ) : (
            <td>{msv}</td>
          )}
          <td>
              <input
                type="hoten"
                value={hoten}
                onChange={(event) => onValUpdate(index, event)}
                name="hoten"
                className="form-control" />
            </td><td>
              <input
                type="text"
                value={ngaysinh}
                onChange={(event) => onValUpdate(index, event)}
                name="ngaysinh"
                className="form-control" />
            </td><td>
              <input
                type="text"
                value={quequan}
                onChange={(event) => onValUpdate(index, event)}
                name="quequan"
                className="form-control" />
            </td><td>
              <button
                className="edit btn btn-dark"
                value={isEdit}
                onClick={() => setIsEdit(index, false)}
              >
                Lưu
              </button>
            </td><td>
              <button
                className="btn btn-dark"
                onClick={() => tableRowRemove(index)}
              >
                Xóa
              </button>
            </td></>
        ) : (
            <>
              <td>{msv}</td>
              <td>{hoten}</td>
              <td>{ngaysinh}</td>
              <td>{quequan}</td>
              <td>
                <button
                  className="edit btn btn-dark"
                  onClick={() => setIsEdit(index, true)}
                >
                  Sửa
              </button>
              </td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => tableRowRemove(index)}
                >
                  Xóa
              </button>
              </td>
            </>
          )}
      </tr>
    );
  });
}
function Table() {
  const [rows, initRow] = useState([]);
  let search = "";
  const addRowTable = () => {
    const data = {
      msv: "",
      hoten: "",
      ngaysinh: "",
      quequan: "",
    };
    initRow([...rows, data]);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    initRow(data);
  };  
  const setIsEdit = (index, value) => {
    const data = [...rows];
    if (value === true) {
      for (let i = 0; i < data.length; i++) {
        data[i].isEdit = false;
        data[i].firstEdit = true;
      }
    } else {
      data[index].firstEdit = true;
    }
    data[index].isEdit = value;
    initRow(data);
  };
  const setSearch = (event) => {
    const {value } = event.target;
    const data = [...rows];
    search = value;
    // Search by msv and show all data with msv like search value on new array
    const newData = data.filter((item) => {
      const itemData = item.msv.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    initRow(newData);
  };
  return (
    <>
      <td>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event)}
                name="search"
                className="form-control" />
            </td>
      <h3 className="text-center">Sinh Viên</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Mã sinh viên</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Quê quán</th>
            <th>
              <button className="btn btn-danger" onClick={addRowTable}>
                Thêm hàng
              </button>
            </th>
            <td>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event)}
                name="search"
                className="form-control" />
            </td>
          </tr>
        </thead>
        <tbody>
          <TableRows
            rows={rows}
            tableRowRemove={tableRowRemove}
            onValUpdate={onValUpdate}
            setIsEdit={setIsEdit}
          />
        </tbody>
      </table>
    </>
  );
}
export default Table;