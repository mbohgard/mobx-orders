import { observable, action } from 'mobx'

class UIState {
  @observable orderLoading = false

  @action setLoader(loader, state) {
    const type = loader + 'Loading'

    if (this[type]) this[type] = state
  }
}

const uiState = new UIState()

export default uiState
