Ext.define('Dashboard.ux.TreeStateful', {
    alias: 'plugin.treestateful',

    extend: 'Ext.AbstractPlugin',
    // add stateEvents and override TreeView methods
    init: function(view) {
        var me = this;
        view.addStateEvents(['afteritemcollapse', 'afteritemexpand']);

        view.getState = me.getState;
        view.saveState = me.saveState;
        if (view.getStore().isLoading()) {
            // restore nodes after load
            view.getStore().on("load", me.applyState, this, {
                single: true
            });
        } else {
            Ext.callback(me.applyState, view);
        }

    },

    saveState: function() {
        var me = this,
            id = me.stateful && me.getStateId(),
            state;
        //console.log("savedid",id);
        if (id) {
            state = me.getState() || []; //pass along for custom interactions
            console.log("state",state);
            Ext.state.Manager.set(id, state);
        }
    },

    getState: function() {
        var ids = [],
            expanded = [];

        this.getStore().getRoot().cascadeBy({
            after: function(node) {
                if (node.isExpanded()) {
                    expanded.push(node);
                }
            }
        });
        // console.log("id1",ids);
        Ext.each(expanded, function(node) {
            if (node.getId() == 'root') return;
            ids.push(node.getId());
        });
        //console.log("id2",ids);
        if (ids.length == 0) {
            ids = null;
        }
        //console.log("id3",ids);
        return ids;
    },

    applyState: function(state) {
        if (!this.cmp) {
            return
        } else {
            var me = this,
                id = me.cmp.stateful && me.cmp.getStateId(),
                state,
                store = me.cmp.store,
                node;
            console.log("store",store);
        }
        // get id of saved nodes and expand it
        if (id) {
            state = Ext.state.Manager.get(id);
            if (state) {
                state = Ext.apply([], state);
                var newstate=state.reverse();
                Ext.each(newstate, function(id) {
                    // console.log('newstate',newstate);
                    // console.log("store_before_node",store);
                    node = store.getNodeById(id);
                    // console.log("node+id",node+" "+id);
                    if (node) {
                        node.bubble(function(node) {
                            node.expand();
                        });
                    }
                });


            }
        }

    }

});