import React, { Component } from 'react';
import { Button, Checkbox, Table } from 'antd';
import { connect } from 'dva';

/**
 * 对checkbox.group 进一步的包装，保证每一个checkbox都是独立的组件
 * 从而拥有独立的state。深入理解react state非常关键
 */
class CheckBoxGroup extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      values: this.props.initValues,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps !== this.props) {
      this.setState({
        ...this.state,
        values: nextProps.initValues,
      });
    }
  }

  render() {
    let { options, onChange } = this.props;
    return (
      <Checkbox.Group
        value={this.state.values}
        options={options}
        onChange={values => {
          this.setState({
            ...this.state,
            values: values,
          });
          onChange(values);
        }}
      />
    );
  }
}

@connect(({ menu, roleManage }) => ({
  menu,
  roleManage,
}))
class MenuTable extends Component {
  state = {
    selectedRowKeys: [],
  };
  roleVsMenuList = [];

  constructor(props) {
    super(props);
    this.props.setRef(this);
  }

  componentDidMount() {}

  getSelectedPermission(record) {
    let values = record.selectedPermission;
    let selectedRow = undefined;
    if (this.roleVsMenuList.length === 0) {
      let { singleRole } = this.props.roleManage;
      if (singleRole && singleRole.roleVsMenuList) {
        selectedRow = singleRole.roleVsMenuList.find(item => {
          return item.menuId === record.menu.id;
        });
      }
    } else {
      selectedRow = this.roleVsMenuList.find(item => {
        return item.menuId === record.menu.id;
      });
    }
    if (selectedRow) {
      if (selectedRow && selectedRow.apiPermissions) {
        values = values.concat(selectedRow.apiPermissions.split(','));
      }
    }

    return values;
  }

  column = [
    {
      title: '菜单名称',
      key: 'menu.menuName',
      dataIndex: 'menu.menuName',
      width: '40%',
    },
    {
      title: '操作权限',
      key: 'permissions',
      width: '60%',
      render: (text, record, index) => {
        console.log(record);
        let options = [];
        if (record.permissions) {
          record.permissions.forEach(item => {
            options.push({
              label: item.permissionName,
              value: item.permissionCode,
            });
          });
        }
        let selectedPermission = this.getSelectedPermission(record);
        return (
          <CheckBoxGroup
            options={options}
            initValues={selectedPermission}
            onChange={values => {
              this.roleVsMenuList.forEach(item => {
                if (item.menuId === record.menu.id) {
                  item.apiPermissions = values.join(',');
                }
              });
              record.selectedPermission = values;
            }}
          />
        );
      },
    },
  ];

  /**
   * 菜单权限展示页面
   * @returns {Array}
   */
  getTableData() {
    let { menu } = this.props;
    let menuData = menu.menus.map(item => {
      item.children = [];
      item.selectedPermission = [];
      return item;
    });

    menuData.forEach(item => {
      menuData.forEach(subItem => {
        if (item.menu.id === subItem.menu.parentMenuId) {
          item.children.push(subItem);
        }
      });
    });

    let anies = menuData.map(item => {
      if (!item.menu.parentMenuId) {
        return item;
      }
    });
    let rt = [];
    anies.forEach(item => {
      if (item) {
        rt.push(item);
      }
    });
    return rt;
  }

  /**
   * 属性值发生改变的时候调用该方法。该方法可以设置当前的组件的状态。
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    let { roleManage } = nextProps;
    if (roleManage.singleRole && roleManage.singleRole.roleVsMenuList) {
      this.roleVsMenuList = roleManage.singleRole.roleVsMenuList;
      let selectedRowKeys = roleManage.singleRole.roleVsMenuList.map(item => {
        return item.menuId;
      });
      this.setState({
        ...this.state,
        selectedRowKeys: selectedRowKeys,
      });
    } else {
      this.roleVsMenuList = [];
      this.setState({
        ...this.state,
        selectedRowKeys: [],
      });
    }
  }

  render() {
    let { currentRole } = this.props;
    let rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ...this.state,
          selectedRowKeys: selectedRowKeys,
        });
        if (selectedRowKeys && selectedRowKeys.length > 0) {
          let newRoleVsMenuList = [];
          selectedRows.forEach(item => {
            let ex = this.roleVsMenuList.find(i => {
              return i.menuId === item.menu.id;
            });
            if (!ex) {
              newRoleVsMenuList.push({
                menuId: item.menu.id,
                apiPermissions: item.selectedPermission.join(','),
                roleId: currentRole.id,
              });
            } else {
              newRoleVsMenuList.push(ex);
            }
          });
          this.roleVsMenuList = newRoleVsMenuList;
        } else {
          this.roleVsMenuList = [];
        }
      },
    };
    return (
      <div>
        <Table
          columns={this.column}
          bordered
          size="small"
          rowKey={'id'}
          scroll={{ y: 400 }}
          pagination={false}
          rowSelection={rowSelection}
          dataSource={this.getTableData()}
        />
      </div>
    );
  }
}

export default MenuTable;
