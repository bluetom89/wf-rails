class WfController < LayoutController

  def index
  end

  def get
    render :show
  end

  def export
    render :export_workflow
  end

  def save
    render :save_workflow
  end

  def load
    render :load_workflow
  end


end
