import React, { Component } from 'react';
import Logger from 'helpers/Logger';
import { Link } from 'react-router-dom';

import { DatePicker } from 'components/common';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner, faSearch } from '@fortawesome/fontawesome-free-solid';
import { Button, Table, FormGroup, Label, Form /*, Input, Breadcrumb, BreadcrumbItem*/ } from 'reactstrap';

import {DateUtils} from 'utils';

class SalesList extends Component {

  constructor(props = {}){
    super(props);

    this.state = {
      searchFrom: props.searchCondition.searchFrom,
      searchTo: props.searchCondition.searchTo
    };
    // this.handleSearch = this.handleSearch.bind(this);
    // Logger.debug('dataList:', props.dataList);
    this.handleSearch();
  }

  handleSearch = () => {
    Logger.debug('props:', this.props);
    this.props.onActions.search({
      searchFrom: this.state.searchFrom,
      searchTo: this.state.searchTo
    });
  }

  // handleDatePickerChange = (e) => {
  //   let change = {...this.state}
  //   change[e.target.name] = e.target.value;
  //   this.setState(change);
  // }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }


  render(){
    const list = this.props.dataList && this.props.dataList.length  ? (
      this.props.dataList.map( sales => 
        <tr key={sales.salesNo}>
          <th scope="row">{sales.salesNo}</th>
          <td>{DateUtils.format(new Date(sales.saleDateTime), 'yyyy.MM.dd')}</td>
          <td>기본</td>
          <td>현금({sales.salesPrice})</td>
          <td>{sales.salesPrice}</td>
          <td>{sales.Customer ? sales.Customer.customerName : ''}</td>
          <td>수정/삭제</td>
          <td>시술상세내역</td>
        </tr>
      )
    ) : (<tr><td colSpan="8">데이터가 없습니다.</td></tr>)

    const spinner = this.props.loading ? (<FontAwesomeIcon icon={faSpinner} spin/>) : ( <FontAwesomeIcon icon={faSearch}/> )

    return(
      <div>
        <Form inline innerRef={c=>this.form=c}>
          <FormGroup>
            <Label for="searchFrom" hidden>검색시작일</Label>
            <DatePicker name="searchFrom" selected={this.state.searchFrom} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="searchTo" hidden>검색종료일</Label>
            <DatePicker name="searchTo" selected={this.state.searchTo} onChange={this.handleChange} />
          </FormGroup>
          <Button onClick={this.handleSearch}>
            {spinner}검색
          </Button>
          
          <Link to='/sales/add'>
            <Button>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Link>
          
        </Form>
        
        <Table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">날짜</th>
              <th scope="col">상품</th>
              <th scope="col">결제수단</th>
              <th scope="col">실매출액</th>
              <th scope="col">고객명</th>
              <th scope="col">수정/삭제</th>
              <th scope="col">시술상세</th>
            </tr>
          </thead>
          <tbody>
             {list}
          </tbody>
        </Table>
      </div>

    )
  }
}

export default SalesList;