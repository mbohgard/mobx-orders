import { observable, action } from 'mobx'

class UIState {
  @observable orderLoading = false
  @observable searchLoading = false
  @observable searchValue = ''

  @action setLoader(loader, state) {
    const type = loader + 'Loading'

    if (this.hasOwnProperty(type)) this[type] = state
  }

  @action setSearchValue(value) {
    this.searchValue = value || ''
  }
}

const uiState = new UIState()

export default uiState
