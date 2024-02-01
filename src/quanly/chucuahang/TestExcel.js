import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from 'xlsx';
class TestExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData:  [
                ["firstname", "lastname", "email"],
                ["Ahmed", "Tomi", "ah@smthing.co.com"],
                ["Raed", "Labes", "rl@smthing.co.com"],
                ["Yezzi", "Min l3b", "ymin@cocococo.com"]
              ]
        };
      }
 
      xuatexcel = () => {
        const ws = XLSX.utils.aoa_to_sheet(this.state.csvData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "example.xlsx");
      }

  render() {

   
      
    return (
      <div>
<button onClick={this.xuatexcel}>excel</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestExcel);
