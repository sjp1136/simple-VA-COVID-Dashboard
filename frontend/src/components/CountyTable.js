import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class CountyTable extends React.Component {
  render() {
    let countyCurrentData = this.props.countyCurrentArray;
    return (
      <div>
        <h1>County Current Data</h1>

        <BootstrapTable
          data={countyCurrentData}
          height="500"
          scrollTop={"Bottom"}
          striped
        >
          <TableHeaderColumn
            dataField="county"
            dataSort={true}
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            isKey
          >
            County
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="cases"
            dataSort={true}
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Cases
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="deaths"
            dataSort={true}
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Deaths
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="newCases"
            dataSort={true}
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Cases Increase
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="newDeaths"
            dataSort={true}
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Death Increase
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="population"
            dataSort={true}
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Population
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="caseDensity"
            dataSort={true}
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Case Density
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="infectionRate"
            dataSort={true}
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            Infection Rate
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default CountyTable;
