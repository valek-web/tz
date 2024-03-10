import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"

interface Param {
  name: string
  value: string
}

class Model {
  params: Param[] = []

  constructor(params: Param[]) {
    makeAutoObservable(this)
    this.params = params
  }

  updateParamValue(index: number, value: string) {
    this.params[index].value = value
  }

  getModel() {
    return {
      params: this.params.map(({ name, value }) => ({ name, value })),
    }
  }
}

const EditableModel: React.FC<{ model: Model }> = observer(({ model }) => {
  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    model.updateParamValue(index, event.target.value)
  }

  const getModel = () => {
    console.log(model.getModel())
  }

  return (
    <div>
      {model.params.map((param, index) => (
        <div key={index}>
          <label>{param.name}</label>
          <input type="text" value={param.value} onChange={(event) => handleChange(index, event)} />
        </div>
      ))}
      <button onClick={getModel}>Get Model</button>
    </div>
  )
})

const params: Param[] = [
  { name: "Param 1", value: "" },
  { name: "Param 2", value: "" },
  { name: "Param 3", value: "" },
]

const model = new Model(params)

const App: React.FC = () => {
  return <EditableModel model={model} />
}

export default App
