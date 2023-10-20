# frozen_string_literal: true

class QcpController < ApplicationController
  # Layout points to app/views/{layout}/index.html.erb
  layout "qcp"

  def index
    @qcp_props = {}
  end
end
