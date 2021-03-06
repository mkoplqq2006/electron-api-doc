/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { Layout, Menu, Icon, Button,Row, Col } from 'antd';
import MembersManager from './MembersManager'
import APIDocumentEntry from './DocumentsManager/APIDocumentEntry'
import AddAPIDocument from './DocumentsManager/AddAPIDocument'
import APIDocumentList from './DocumentsManager/APIDocumentList'
import UserIcon from '../../components/UserIcon/UserIcon'
import './index.less'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const MenuItem = Menu.Item
class ManagerContainer extends Component{
  static defaultProps = {
    menuKey: 'members'
  }
  state = {
    collapsed: false,
    rootMenuName: '',
    curMenuKey: 'members'
  };
  managerParams = {
    currentPrePath: '',
    user: {},
    apiDoc: {}
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  toUserGroupEntry = () => {
    const {history,location} = this.props
    const newHistory = {
      pathname: '/userGroup',
      state: {
        user: location.state.user
      }
    }
    history.push(newHistory)
  }
  getRoutePath(nextPath,prePath){
    return `${prePath}/${nextPath}`
  }
  // handleMenuClick = ({item,key,keyPath}) =>{
  //   const {history} = this.props
  //   const path = this.managerParams.currentPrePath
  //   const targetPath = this.getRoutePath(key,path)
  //   const nextLocation = {
  //     pathname: targetPath,
  //     state:{...this.managerParams}
  //   }
  //   history.push(nextLocation)
  // }
  // componentDidMount(){
  //   const {location,history,menuKey,match} = this.props
  //   this.managerParams.currentPrePath = match.url
  //   const user = location.state.user
  //   const targetPath = this.getRoutePath(menuKey,match.url)
  //
  //   this.managerParams = {...this.managerParams,...{user:user}}
  //   const nextLocation = {
  //     pathname: targetPath,
  //     state: this.managerParams
  //   }
  //   history.push(nextLocation)
  // }

  handleSwitchMenu = ({item,key,keyPath}) => {
      this.setState({
        curMenuKey: key,
        rootMenuKey: keyPath[1]
      })
  }

  render() {
    const {location,match,menuKey,history} = this.props
    const {name,key} = location.state.user
    const userGroupKey = location.state.userGroup.key
    const {rootMenuName,curMenuKey} = this.state
    const apiDocData = {
      name: 'react'
    }
    return (
      <Layout className='manager-wrapper'>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ background: '#fff' }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            // onClick={this.handleMenuClick}
            onClick={this.handleSwitchMenu}
            defaultSelectedKeys={['0']}
          >
            <MenuItem key="members" >
              <Icon type="user" />
              <span>成员管理</span>
            </MenuItem>
            <MenuItem key="addApiDoc">
              <Icon type="file-add" />
              <span>新建API文档</span>
            </MenuItem>
            <MenuItem key="listApiDoc">
              <Icon type="appstore-o" />
              <span>管理API文档</span>
            </MenuItem>
            <MenuItem key="entryApiDoc">
              <Icon type="folder" />
              <span>查看API文档</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <UserIcon
              history={history}
              style={{float:'right'}}
              user={location.state.user}
            />
            <Button
              style={{float:'right',marginTop:'18px'}}
              onClick={this.toUserGroupEntry}>
              切换用户组
            </Button>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0',display:'flex',postition:'relative'}}>
            <div style={{ padding: 24, background: '#fff',flex:'auto',width:'100%'}}>
              {/*<Route path={`${match.url}/members`} component={MembersManager}/>*/}
              {/*<Route path={`${match.url}/addAPIDoc`} component={AddAPIDocument}/>*/}
              {/*<Route path={`${match.url}/showAPIDoc`} component={APIDocumentList}/>*/}
              {/*<Route path={`${match.url}/apiOperation`} component={APIDocOperation}/>*/}
              {
              curMenuKey==='members'?
              <MembersManager
                userGroupKey={userGroupKey}
                user={location.state.user}
              />:
              curMenuKey==='entryApiDoc'?
              <APIDocumentEntry
              data={apiDocData}
              />:
              curMenuKey==='addApiDoc'?
              <AddAPIDocument
                history={history}
                userGroupKey={userGroupKey}
              />:
              curMenuKey==='listApiDoc'?
              <APIDocumentList
                userGroupKey={userGroupKey}
              />:
              null
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default ManagerContainer
