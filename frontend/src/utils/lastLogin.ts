export function timeAgo(date: Date | string | null): string {
    
    if (!date) { return 'Sem acesso'; }

    const diff = Date.now() - new Date(date).getTime();

    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) { return 'Agora mesmo'; }
    if (minutes < 60) { return `Há ${minutes} min`; }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) { return `Há ${hours} hora${hours > 1 ? 's' : ''}` ;}

    const days = Math.floor(hours / 24);
    if (days < 7) { return `Há ${days} dia${days > 1 ? 's' : ''}`; }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) { return `Há ${weeks} semana${weeks > 1 ? 's' : ''}`; }

    const months = Math.floor(days / 30);
    if (months < 12) { return `Há ${months} mês${months > 1 ? 'es' : ''}`; }

    const years = Math.floor(days / 365);
    return `Há ${years} ano${years > 1 ? 's' : ''}`;
}