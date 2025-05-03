function App() {
  return (
    <>
      <table>
        <caption>Product List</caption>

        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Icon</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">1</th>

            <td>Product Name</td>
            <td>
              <img
                src="https://placehold.co/600x400?font=montserrat"
                alt=""
                width="50"
                height="50"
              />
            </td>
            <td>$99.99</td>
            <td>37</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
