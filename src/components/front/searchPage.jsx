import React, { Component } from 'react';
import { Button, Card, Col, Row, Icon, Radio, Input, Select } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import styles from './style.less';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;

class SearchPageIndex extends Component {
  state = {
    title: '',
    titleEn: 'reference library',
    searchPath: '',
    currentTypeOptions: {
      searchOptions: [],
    },
    params: {
      dbType: '',
      searchType: '',
      searchContent: '',
    },
  };
  componentDidMount() {
    let { title, titleEn, searchPath, dbTypeOptions, defaultSearchType } = this.props;
    this.setState({
      title: title,
      titleEn: titleEn,
      searchPath: searchPath,
      currentTypeOptions: dbTypeOptions[0],
      params: {
        ...this.state.params,
        searchType: defaultSearchType,
      },
    });
  }
  onChange(e) {
    const { dbTypeOptions } = this.props;
    let currentTypeOptions = dbTypeOptions.find(item => item.value === e.target.value);
    this.setState({
      currentTypeOptions: currentTypeOptions,
      params: {
        ...this.state.params,
        dbType: e.target.value,
        searchType: currentTypeOptions.searchOptions[0].value,
        searchContent: '',
      },
    });
  }
  changeSearchType(val) {
    this.setState({
      params: {
        ...this.state.params,
        searchType: val,
        searchContent: '',
      },
    });
  }
  changeSearchContent(e) {
    this.setState({
      params: {
        ...this.state.params,
        searchContent: e.target.value,
      },
    });
  }
  render() {
    const { dbTypeOptions, defaultSearchType } = this.props;
    const searchTypeOptions = this.state.currentTypeOptions.searchOptions;
    return (
      <div className={styles.searchIndexBox}>
        <div className={styles.searchForm}>
          <div className={styles.searchTitleCn}>竞争情报与政策研究-{this.state.title}库</div>
          <div className={styles.searchTitleEn}>
            Competitive intelligence and policy research - {this.state.titleEn}
          </div>
          <Radio.Group onChange={this.onChange.bind(this)} value={this.state.params.dbType}>
            {dbTypeOptions.map(item => (
              <Radio.Button key={item.key} value={item.value}>
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
          <InputGroup compact>
            <Select
              defaultValue={defaultSearchType}
              value={this.state.params.searchType}
              onChange={this.changeSearchType.bind(this)}
            >
              {searchTypeOptions.map(item => (
                <Option
                  key={item.key}
                  value={item.value}
                  style={{
                    fontSize: '18px',
                    height: '46px',
                    lineHeight: '46px',
                    color: 'rgba(0,0,0,0.45)',
                  }}
                >
                  {item.name}
                </Option>
              ))}
            </Select>
            <Input
              style={{ width: '687px' }}
              value={this.state.params.searchContent}
              onChange={this.changeSearchContent.bind(this)}
              placeholder="请您在这里搜索你想要了解的信息"
            />
            <Button
              type="primary"
              icon="search"
              onClick={() => {
                router.push({
                  pathname: this.state.searchPath,
                  query: {
                    typeName: this.state.currentTypeOptions.value
                      ? this.state.currentTypeOptions.name
                      : '',
                    currentTypeOptions: this.state.currentTypeOptions,
                    searchType: this.state.params.searchType,
                    searchContent: this.state.params.searchContent,
                  },
                });
              }}
            >
              搜索
            </Button>
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default SearchPageIndex;
