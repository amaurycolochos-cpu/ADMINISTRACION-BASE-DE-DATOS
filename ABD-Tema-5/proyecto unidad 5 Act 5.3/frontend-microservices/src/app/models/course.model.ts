// Asi es como se ve un Curso del lado del front. es solo un molde (interface),
// no guarda nada, nomas le dice a typescript "los cursos traen estos campos".
// ojo: estos nombres tienen q ser iguales a los del json que suelta el
// backend en /api/course/all, si el back los llama distinto hay q cambiarlos aqui
export interface Course {
  id: number;
  name: string;
  description: string;
}
