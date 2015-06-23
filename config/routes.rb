Rails.application.routes.draw do

  root 'layout#index'

  get '/items/edit_conn' => 'wf#edit_conn'
  get '/items/edit_item' => 'wf#edit_item'

  get '/predefined/index' => 'predefined#index'
  get '/predefined/create' => 'predefined#create'
  get '/predefined/edit/(:id)' => 'predefined#edit'
  get '/predefined/destroy/(:id)' => 'predefined#destroy'

  get '/wf/save_workflow' => 'wf#save_workflow'
  get '/wf/export_workflow' => 'wf#export_workflow'
  get '/wf/load_workflow' => 'wf#load_workflow'

end

