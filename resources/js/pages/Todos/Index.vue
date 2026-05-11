<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';

interface Todo {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

defineProps<{
    todos: Todo[];
}>();

const newTitle = ref('');
const newDescription = ref('');

const createTodo = () => {
    if (!newTitle.value.trim()) return;
    
    router.post('/todos', {
        title: newTitle.value,
        description: newDescription.value,
    }, {
        onSuccess: () => {
            newTitle.value = '';
            newDescription.value = '';
        },
    });
};

const toggleComplete = (todo: Todo) => {
    router.put(`/todos/${todo.id}`, {
        completed: !todo.completed,
    });
};

const deleteTodo = (todo: Todo) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    router.delete(`/todos/${todo.id}`);
};
</script>

<template>
    <AppLayout title="My Todos">
        <div class="min-h-screen bg-background py-8">
            <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-foreground mb-8">My Todo List</h1>

                <!-- Create Todo Form -->
                <div class="bg-card rounded-lg shadow-md p-6 mb-6 border border-border">
                    <h2 class="text-xl font-semibold text-foreground mb-4">Add New Todo</h2>
                    <form @submit.prevent="createTodo" class="space-y-4">
                        <div>
                            <label for="title" class="block text-sm font-medium text-foreground mb-1">
                                Title *
                            </label>
                            <input
                                id="title"
                                v-model="newTitle"
                                type="text"
                                placeholder="What needs to be done?"
                                class="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground bg-background placeholder-muted-foreground"
                            />
                        </div>
                        <div>
                            <label for="description" class="block text-sm font-medium text-foreground mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                v-model="newDescription"
                                rows="3"
                                placeholder="Add some details (optional)"
                                class="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none text-foreground bg-background placeholder-muted-foreground"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Add Todo
                        </button>
                    </form>
                </div>

                <!-- Todo List -->
                <div class="bg-card rounded-lg shadow-md overflow-hidden border border-border">
                    <div class="px-6 py-4 border-b border-border">
                        <h2 class="text-xl font-semibold text-foreground">
                            Your Tasks ({{ todos.length }})
                        </h2>
                    </div>

                    <div v-if="todos.length === 0" class="px-6 py-12 text-center">
                        <p class="text-muted-foreground text-lg">No todos yet. Add one above!</p>
                    </div>

                    <ul v-else class="divide-y divide-border">
                        <li
                            v-for="todo in todos"
                            :key="todo.id"
                            class="px-6 py-4 hover:bg-muted/50 transition-colors"
                        >
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex items-start gap-3 flex-1">
                                    <button
                                        @click="toggleComplete(todo)"
                                        class="mt-1 flex-shrink-0 w-5 h-5 rounded border-2 transition-colors"
                                        :class="todo.completed 
                                            ? 'bg-green-500 border-green-500' 
                                            : 'border-input hover:border-green-500'"
                                    >
                                        <svg
                                            v-if="todo.completed"
                                            class="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </button>
                                    <div class="flex-1 min-w-0">
                                        <p
                                            class="text-base font-medium transition-colors"
                                            :class="todo.completed 
                                                ? 'text-muted-foreground line-through' 
                                                : 'text-foreground'"
                                        >
                                            {{ todo.title }}
                                        </p>
                                        <p
                                            v-if="todo.description"
                                            class="mt-1 text-sm text-muted-foreground"
                                            :class="todo.completed ? 'opacity-70' : ''"
                                        >
                                            {{ todo.description }}
                                        </p>
                                        <p class="mt-1 text-xs text-muted-foreground">
                                            Created {{ new Date(todo.created_at).toLocaleDateString() }}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    @click="deleteTodo(todo)"
                                    class="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    title="Delete todo"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
