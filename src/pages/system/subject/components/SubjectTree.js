import { Component } from 'react';
import { Tree } from 'antd';
import { connect } from 'dva';
import globalStyles from '@/global.less';

@connect(({ subject }) => ({ subject }))
class SubjectTree extends Component {
  makeDatas(data, parent) {
    data.forEach(item => {
      let pId = item.subjectClass.parentId ? item.subjectClass.parentId : item.typeId;
      if (pId == parent.key) {
        let obj = {
          key: item.id,
          title: item.subjectClass.subjectName,
          children: [],
        };
        if (item.children.length > 0) {
          this.makeDatas(item.children, obj);
        }
        parent.children.push(obj);
      }
    });
  }

  buildTreeData(treeData, treeDatas) {
    treeData.forEach(item => {
      item.children = [];
    });

    //提供数据作准备
    treeData.forEach(item => {
      treeData.forEach(item1 => {
        if (item1.subjectClass.parentId == item.id) {
          item.children.push(item1);
        }
      });
    });

    treeDatas.forEach(item => {
      this.makeDatas(treeData, item);
    });
  }

  render() {
    let { treeData, dbTypes } = this.props;
    let treeDatas = [];
    treeDatas = Array.from(
      dbTypes.map(value => {
        return {
          key: value.id,
          title: value.typeName,
          children: [],
        };
      }),
    );

    this.buildTreeData(treeData, treeDatas);

    return <Tree treeData={treeDatas}></Tree>;
  }
}

export default SubjectTree;
