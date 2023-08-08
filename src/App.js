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
import AddProject from './components/AddProject'
import EditProject from './components/EditProject'
import AddClient from './components/AddClient'
import EditClient from './components/EditClient'
import AddDiscussion from './components/AddDiscussion'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/clients" component={Clients} />
      <ProtectedRoute exact path="/input" component={Input} />
      <ProtectedRoute exact path="/projects" component={Projects} />
      <ProtectedRoute exact path="/staff" component={Staff} />
      <ProtectedRoute exact path="/addstaff" component={AddStaff} />
      <ProtectedRoute exact path="/editStaff/:id" component={EditStaff} />
      <ProtectedRoute exact path="/addproject" component={AddProject} />
      <ProtectedRoute exact path="/editproject/:id" component={EditProject} />
      <ProtectedRoute exact path="/addclient" component={AddClient} />
      <ProtectedRoute exact path="/editclient/:id" component={EditClient} />
      <ProtectedRoute exact path="/adddiscussion" component={AddDiscussion} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
