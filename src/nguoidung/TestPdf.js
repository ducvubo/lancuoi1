import React, { Component } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [{ iname: '', quantity: '', amount: '', total: 0 }],
      billTotal: 0,
    };
  }

  componentDidMount() {
    this.calculateBillTotal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.item !== this.state.item) {
      this.calculateBillTotal();
    }
  }

  handleChange = (index, event) => {
    let data = [...this.state.item];
    data[index][event.target.name] = event.target.value;
    data[index]['total'] = (data[index]['quantity'] * data[index]['amount']).toFixed(2);
    this.setState({ item: data });
  };

  removeEntry = (index) => {
    let data = [...this.state.item];
    data.splice(index, 1);
    this.setState({ item: data });
  };

  addItem = () => {
    const newItem = { iname: '', quantity: '', amount: '', total: 0 };
    this.setState((prevState) => {
      const newArray = [...prevState.item, newItem];
      return { item: newArray };
    });
  };

  calculateBillTotal = () => {
    let data = [...this.state.item];
    let temp = 0;
    for (let i = 0; i < data.length; i++) {
      temp = parseFloat(data[i].total) + temp;
    }
    this.setState({ billTotal: temp.toFixed(2) });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    let newArray = [];
    for (let i = 0; i < this.state.item.length; i++) {
      newArray.push([i + 1, this.state.item[i].iname, this.state.item[i].quantity, this.state.item[i].amount, this.state.item[i].total]);
    }
    doc.text('N.A.K Vessels shop', 70, 20);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    doc.text(`Date: ${today}`, 200, 25, null, null, 'right');
    doc.text(`Customer name: Murugan`, 200, 30, null, null, 'right');
    autoTable(doc, {
      head: [['S.no', 'Item name', 'Quantity', 'Amount', 'Total']],
      body: newArray,
      startY: 35,
    });
    let finalY = doc.previousAutoTable.finalY;
    doc.text(`Total amount to be paid: ${this.state.billTotal}`, 12, finalY + 10);
    doc.save('Bill.pdf');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="App">
          {this.state.item.map((input, index) => (
            <div key={index}>
              <input name="iname" placeholder="item name" value={input.iname} onChange={(event) => this.handleChange(index, event)}></input>
              <input
                name="quantity"
                type="number"
                pattern="[0-9]*"
                step=".001"
                min=".000"
                max="999.999"
                placeholder="quantity"
                value={input.quantity}
                onChange={(event) => this.handleChange(index, event)}
              ></input>
              <input
                name="amount"
                type="number"
                pattern="[0-9]*"
                step=".01"
                min=".01"
                max="99999.99"
                placeholder="amount"
                value={input.amount}
                onChange={(event) => this.handleChange(index, event)}
              ></input>
              <input name="total" placeholder="total" value={input.total} readOnly></input>
              <button key={index} onClick={() => this.removeEntry(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={this.addItem}>
            Add+
          </button>
          <h3>Total amount: {this.state.billTotal ? this.state.billTotal : 0}</h3>
          <button type="submit">submit</button>
        </div>
      </form>
    );
  }
}

export default App;
