type ModuleType =
  // 発話
  'SpeechScenarioModule' |
  // ユーザーの自由入力用
  'ListeningScenarioModule' |
  // 選択肢のあるユーザー入力
  'OptionListeningScenarioModule'

type OptionListeningScenarioModule = {
  label: string
  value: string
}[]

export type IfroAttributes = {
  client_action_type: '0' | '1' | '2'
  client_message: string | null
  client_rendering_content: string | null
  client_speech_content_url: string | null
  created_at: string
  current_module_id: string
  current_module_label: string
  current_module_type: ModuleType
  custom_parameter: string | null
  module_message: string | null
  next_module_id: string | null
  next_module_label: string
  next_module_type: ModuleType
  options: OptionListeningScenarioModule | null
  project_id: number
  project_label: string
  project_thumbnail_url: string | null
  user_id: string
}

export type IfroResponse = {
  data: {
    attributes: IfroAttributes
    id: string
    type: string
  }
}
