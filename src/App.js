import {Route, Switch} from 'react-router-dom'

import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import Clients from './components/Clients'
import Input from './components/Input'
import Login from './components/Login'
import Staff from './components/Staff'
import Projects from './components/Projects'
import AddStaff from './components/AddStaff'
import EditStaff from './components/EditStaff'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/input" component={Input} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/staff" component={Staff} />
      <Route exact path="/addstaff" component={AddStaff} />
      <Route exact path="/editStaff" component={EditStaff} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
