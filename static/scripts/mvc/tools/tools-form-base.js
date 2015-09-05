define(["utils/utils","utils/deferred","mvc/ui/ui-misc","mvc/form/form-view","mvc/tools/tools-template","mvc/citation/citation-model","mvc/citation/citation-view"],function(a,b,c,d,e,f,g){return Backbone.View.extend({initialize:function(a){this.deferred=new b,this.setElement("<div/>"),this._buildForm(a)},_buildForm:function(b){var c=this;this.options=a.merge(b,this.options),this.options=a.merge({icon:"fa-wrench",title:"<b>"+b.name+"</b> "+b.description+" (Galaxy Tool Version "+b.version+")",operations:this._operations(),onchange:function(){c.deferred.reset(),c.deferred.execute(function(){c._updateModel()})}},this.options),this.form=new d(this.options),this._footer(),this.$el.empty(),this.$el.append(this.form.$el)},_buildModel:function(b){var c=this;this.options.id=b.id,this.options.version=b.version;var d=Galaxy.root+"api/tools/"+b.id+"/build?";if(b.job_id)d+="job_id="+b.job_id;else if(b.dataset_id)d+="dataset_id="+b.dataset_id;else{d+="tool_version="+b.version+"&";var e=top.location.href,f=e.indexOf("?");-1!=e.indexOf("tool_id=")&&-1!==f&&(d+=e.slice(f+1))}var g=this.deferred.register();a.request({type:"GET",url:d,success:function(a){c._buildForm(a.tool_model||a),c.form.message.update({status:"success",message:"Now you are using '"+c.options.name+"' version "+c.options.version+".",persistent:!1}),c.deferred.done(g)},error:function(a){c.deferred.done(g);var b=a.error||"Uncaught error.";c.form.modal.show({title:"Tool cannot be executed",body:b,buttons:{Close:function(){c.form.modal.hide()}}})}})},_updateModel:function(){var b=this.options.update_url||Galaxy.root+"api/tools/"+this.options.id+"/build",c=this,d=this.form,e={tool_id:this.options.id,tool_version:this.options.version,inputs:$.extend(!0,{},c.form.data.create())};d.wait(!0);var f=this.deferred.register();a.request({type:"POST",url:b,data:e,success:function(a){c.form.update(a.tool_model||a),c.options.update&&c.options.update(a),d.wait(!1),c.deferred.done(f)},error:function(a){c.deferred.done(f)}})},_operations:function(){var a=this,b=this.options,d=new c.ButtonMenu({icon:"fa-cubes",title:!b.narrow&&"Versions"||null,tooltip:"Select another tool version"});if(!b.is_workflow&&b.versions&&b.versions.length>1)for(var f in b.versions){var g=b.versions[f];g!=b.version&&d.addMenu({title:"Switch to "+g,version:g,icon:"fa-cube",onclick:function(){var c=b.id.replace(b.version,this.version),d=this.version;a.deferred.reset(),a.deferred.execute(function(){a._buildModel({id:c,version:d})})}})}else d.$el.hide();var h=new c.ButtonMenu({icon:"fa-caret-down",title:!b.narrow&&"Options"||null,tooltip:"View available options"});return b.biostar_url&&(h.addMenu({icon:"fa-question-circle",title:"Question?",tooltip:"Ask a question about this tool (Biostar)",onclick:function(){window.open(b.biostar_url+"/p/new/post/")}}),h.addMenu({icon:"fa-search",title:"Search",tooltip:"Search help for this tool (Biostar)",onclick:function(){window.open(b.biostar_url+"/local/search/page/?q="+b.name)}})),h.addMenu({icon:"fa-share",title:"Share",tooltip:"Share this tool",onclick:function(){prompt("Copy to clipboard: Ctrl+C, Enter",window.location.origin+Galaxy.root+"root?tool_id="+b.id)}}),Galaxy.user&&Galaxy.user.get("is_admin")&&h.addMenu({icon:"fa-download",title:"Download",tooltip:"Download this tool",onclick:function(){window.location.href=Galaxy.root+"api/tools/"+b.id+"/download"}}),b.requirements&&b.requirements.length>0&&h.addMenu({icon:"fa-info-circle",title:"Requirements",tooltip:"Display tool requirements",onclick:function(){this.visible?(this.visible=!1,a.form.message.update({message:""})):(this.visible=!0,a.form.message.update({persistent:!0,message:e.requirements(b),status:"info"}))}}),b.sharable_url&&h.addMenu({icon:"fa-external-link",title:"See in Tool Shed",tooltip:"Access the repository",onclick:function(){window.open(b.sharable_url)}}),{menu:h,versions:d}},_footer:function(){var a=this.options;if(""!=a.help&&this.form.$el.append(e.help(a)),a.citations){var b=$("<div/>"),c=new f.ToolCitationCollection;c.tool_id=a.id;var d=new g.CitationListView({el:b,collection:c});d.render(),c.fetch(),this.form.$el.append(b)}}})});
//# sourceMappingURL=../../../maps/mvc/tools/tools-form-base.js.map