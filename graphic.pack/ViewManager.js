import Canvas from engine;

class ViewManager {
  static layerList = [];

  static generate(number) {
    for (let i of new Array(number)) LayerManager.layerList.push(new Canvas);
  }

  static get(i) {
    return LayerManager.layerList[i];
  }

  static clearAll() {
    for (let layer of LayerManager.layerList) !layer.manualClear && layer.clear();
  }
}
