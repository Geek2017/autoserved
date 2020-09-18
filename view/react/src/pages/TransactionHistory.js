import React from 'react';
import ReactTable from 'react-table';
import FuzzySearch from 'fuzzy-search';
import dateFormat from 'dateformat';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import RangeDatePicker from '../components/common/RangeDatePicker';
import getTransactionHistoryData from '../data/autoserved-transaction-history';

import { formatter } from '../utils/helper';

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      tableData: []
    };

    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
  }

  componentWillMount() {
    const tableData = getTransactionHistoryData();

    this.setState({
      ...this.state,
      tableData
    });

    // Initialize the fuzzy searcher.
    this.searcher = new FuzzySearch(tableData, ['customer', 'status'], {
      caseSensitive: false
    });
  }

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  getStatusClass(status) {
    const statusMap = {
      Canceled: 'danger',
      Complete: 'success',
      Pending: 'warning'
    };

    return `text-${statusMap[status]}`;
  }

  /**
   * Handles the page size change event.
   */
  handlePageSizeChange(e) {
    this.setState({
      ...this.state,
      pageSize: e.target.value
    });
  }

  /**
   * Handles the global search.
   */
  handleFilterSearch(e) {
    this.setState({
      ...this.state,
      tableData: this.searcher.search(e.target.value)
    });
  }

  render() {
    const { tableData, pageSize, pageSizeOptions } = this.state;
    const tableColumns = [
      {
        Header: '#',
        accessor: 'transactionNumber',
        className: 'text-center'
      },
      {
        Header: 'Date',
        accessor: 'date',
        className: 'text-center',
        Cell: row => dateFormat(new Date(row.original.date), 'mmm dd, yyyy')
      },
      {
        Header: 'Type',
        accessor: 'type',
        className: 'text-center'
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: row => (
          <span className="text-success">
            {formatter.format(row.original.amount.toFixed(2))}
          </span>
        ),
        className: 'text-center'
      },
      {
        Header: 'Fee',
        accessor: 'fee',
        Cell: row => (
          <span className="text-info">
            {formatter.format(row.original.fee.toFixed(2))}
          </span>
        ),
        className: 'text-center'
      },
      {
        Header: 'Credit',
        accessor: 'credit',
        Cell: row => (
          <span className="text-danger">
            ({formatter.format(row.original.credit.toFixed(2))})
          </span>
        ),
        className: 'text-center'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
          <span className={this.getStatusClass(row.original.status)}>
            {row.original.status}
          </span>
        ),
        className: 'text-center'
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Transactions"
            subtitle="History"
            className="text-sm-left mb-3"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <RangeDatePicker className="justify-content-end" />
          </Col>
        </Row>
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                <Col className="file-manager__filters__rows d-flex" md="6">
                  <span>Show</span>
                  <FormSelect
                    size="sm"
                    value={this.state.pageSize}
                    onChange={this.handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size}
                      </option>
                    ))}
                  </FormSelect>
                  <span className="ml-1">entries</span>
                </Col>
                <Col className="file-manager__filters__search d-flex" md="6">
                  <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText placeholder="Search">
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody className="p-0">
            <div>
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default TransactionHistory;
