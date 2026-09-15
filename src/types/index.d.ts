export interface StepperFormStep {
  /** Form field name and draft-storage key. */
  key: string;
  /** Question rendered as the step heading. */
  legend: string;
  /** Persistent label above the input. */
  label?: string;
  /** Label shown in the review table (defaults to label, then legend). */
  review?: string;
  /** Field type. Default: "text". */
  type?: "text" | "email" | "textarea" | "pills";
  placeholder?: string;
  autocomplete?: string;
  inputmode?: string;
  /** Blocks advancing while empty. Email type validates format. */
  required?: boolean;
  /** Error copy shown when validation fails. */
  error?: string;
  /** For type="pills": the radio options. */
  options?: string[];
  /** For type="pills": pre-selected option (defaults to first). */
  defaultValue?: string;
  /** For type="textarea": row count. Default: 4. */
  rows?: number;
}

export interface StepperFormProps {
  /** Instance id — namespaces input ids and the localStorage draft key. */
  id?: string;
  /** POST target receiving { email, website, source, note }. */
  endpoint: string;
  /** Value sent as `source`. */
  source: string;
  /** Note string with {stepKey} interpolation. Default: "{note}". */
  noteTemplate?: string;
  submitLabel?: string;
  reviewLabel?: string;
  doneLabel?: string;
  doneLine?: string;
  doneFoot?: string;
  steps: StepperFormStep[];
}
