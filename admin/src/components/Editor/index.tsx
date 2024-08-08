import React, { useCallback, lazy, useMemo } from 'react';
import { Editor } from '@tinymce/tinymce-react'

interface TinyMCEEditorProps {
    initialValue?: string;
    placeholder: string;
    height?: number;
    onEditorChange: (content: string) => void;
}

// Memoized configuration object
const getEditorConfig = (placeholder: string, height: number) => ({
    skin: 'snow',
    icons: 'thin',
    placeholder: placeholder,
    height: height,
    menubar: false,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | pre|' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
    initialValue,
    placeholder,
    height = 400,
    onEditorChange,
}) => {


    // Use callback to avoid unnecessary re-renders
    const handleEditorChange = useCallback((content: string) => {
        if (onEditorChange) {
            onEditorChange(content);
        }
    }, [onEditorChange]);

    // Memoized configuration object
    const editorConfig = useMemo(() => getEditorConfig(placeholder, height), [placeholder, height]);

    return (

        <Editor
            apiKey='rr4q71mzzru7yfz9vomaogruqqy9qg6uaeanbhbx8yyw8o6w'
            initialValue={initialValue}
            init={editorConfig}
            onEditorChange={handleEditorChange}
        />

    );
};

export default TinyMCEEditor;
