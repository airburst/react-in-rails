# frozen_string_literal: true

class HelloWorldController < ApplicationController
  # Layout points to app/views/{layout}/index.html.erb
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger" }
  end
end
