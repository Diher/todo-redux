import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, borrarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';


export const initialState: Todo[] = [
    new Todo('Nueva Tarea 0'),
    new Todo('Nueva Tarea 1'),
    new Todo('Nueva Tarea 2'),
    new Todo('Nueva Tarea 3')
 ];

// tslint:disable-next-line:variable-name
const _todoReducer = createReducer( initialState,
    on(crear,     (state, { texto }) => [...state, new Todo(texto)]),
    on(borrar,    (state, { id }) =>  state.filter(todo => todo.id !== id)),
    on(toggleAll, (state, { completado }) =>  state.map(todo => {
        return { 
            ...todo,
            completado
        };
    })),
    on(borrarCompletados, (state) =>  state.filter(todo => !todo.completado )),
    on(toggle, (state, { id }) => {
        return state.map(todo => { 
            if (todo.id === id) { 
                return { 
                    ...todo,
                    completado: !todo.completado
                };
            } else { 
                return todo;
            }
        });
    }),
    on(editar, (state, { id, texto }) => {
        return state.map(todo => { 
            if (todo.id === id) { 
                return { 
                    ...todo,
                    texto
                };
            } else { 
                return todo;
            }
        });
    })
);

export function todoReducer( state, action ) {
    return _todoReducer(state, action);
}
