import {z} from 'zod';


const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
});

type Auth = z.infer<typeof AuthSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegisterForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ConfirmTokenForm = Pick<Auth, "token">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type ChangePasswordForm = Pick<Auth, "current_password" | "password" | "password_confirmation">;
export type CheckPassWordForm = Pick<Auth, "password">;

export const UserSchema = AuthSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;



const NoteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: UserSchema,
    task: z.string(),
    createdAt: z.string(),
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteFormData = Pick<Note, "content">;

export const TaskStatusSchema = z.enum([
    "PENDING",
    "ON_HOLD",
    "IN_PROGRESS",
    "UNDER_REVIEW",
    "COMPLETED"
]);
export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    projectId: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
       user: UserSchema,
       status: TaskStatusSchema,
    })),
    notes: z.array(NoteSchema.extend({
        createdBy: UserSchema
    })),
    status: TaskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const TaskProjectSchema = TaskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
});

export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(UserSchema.pick({_id: true})),
    tasks: z.array(TaskProjectSchema),
    team: z.array(z.string(UserSchema.pick({_id: true}))),
});

export const DashBoardProjectSchema = z.array(
    ProjectSchema.pick({_id: true, projectName: true, clientName: true, description: true, manager: true}),
);

export const EditProjectSchema = ProjectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">
export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type TaskProject = z.infer<typeof TaskProjectSchema>;

export const TeamMemberSchema = UserSchema.pick({
    _id: true,
    name: true,
    email: true,
})

export const TeamMembersSchema = z.array(TeamMemberSchema);



export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
