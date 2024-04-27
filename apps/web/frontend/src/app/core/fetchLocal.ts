interface ApiResponse {
    success: boolean;
    data?: string;
    error?: string;
}

export const sendMessageToRoom = async (roomNumber: string, queryMessage: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/test?room_num=${roomNumber}&query_message=${encodeURIComponent(queryMessage)}`);
        if (response.ok) {
            const result = await response.text();
            return { success: true, data: result };
        } else {
            return { success: false, error: 'Error: ' + response.status };
        }
    } catch (error) {
        return { success: false, error: 'Error: ' + error.message };
    }
};
