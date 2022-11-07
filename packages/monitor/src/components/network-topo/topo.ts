import { Monitor_Edge, Base_Node } from '@share/components/network-topo'
export default class core {
  edge_methods: InstanceType<typeof Monitor_Edge>
  node_methods: InstanceType<typeof Base_Node>
  constructor() {
    this.edge_methods = new Monitor_Edge()
    this.node_methods = new Base_Node()
  }
}
