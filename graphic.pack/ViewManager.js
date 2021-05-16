import View from engine.graphic;

class ViewManager {
  static viewList = [];

  static generate(number) {
    for (let i of new Array(number)) ViewManager.viewList.push(new View);
  }

  static get(i) {
    return ViewManager.viewList[i];
  }

  static clearAll() {
    for (let view of ViewManager.viewList) !view.manualClear && view.clear();
  }
}
