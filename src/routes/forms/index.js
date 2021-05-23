import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProviderForm from '../../component/forms/provider'
import CategoryForm from '../../component/forms/category'
import PlantForm from '../../component/forms/plant'

export default function FormRoutes() {
    return (
        <Switch>
            <Route path="/category/create" render={() => <CategoryForm mode="create"/>}/>
            <Route path="/category/edit" render={(props) => <CategoryForm selectedCategory={props.location.data} mode="edit"/>}/>
            <Route path="/plant/create" render={() => <PlantForm/>}/>
            <Route path="/provider/create" render={() => <ProviderForm />}/>
        </Switch>
    )
}