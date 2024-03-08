import { Box, Button, Typography } from '@mui/material'
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'
import { useDropzone } from 'react-dropzone'
import { DriveFolderUpload, FolderZip, WarningAmber } from '@mui/icons-material'

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string
    webkitdirectory?: string
  }
}

interface SubmitFolderCardProps {
  setInputArray: Dispatch<SetStateAction<string[]>>
  setOutputArray: Dispatch<SetStateAction<string[]>>
}

export default function SubmitFolderCard({
  setInputArray,
  setOutputArray,
}: SubmitFolderCardProps) {
  const errorText = 'Uploaded wrong folder type!'
  const [testFolder, setTestFolder] = useState<FileList | null>(null)
  // const [folderName, setFolderName] = useState<string>('')
  const [errorType, setErrorType] = useState<boolean>(false)

  // const [inputArray, setInputArray] = useState<string[]>([])
  // const [outputArray, setOutputArray] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrorType(false)
    if (rejectedFiles.length > 0) {
      setErrorType(true)
    }
    if (acceptedFiles) {
      console.log(acceptedFiles)
      setTestFolder(acceptedFiles)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // multiple: false,
    // directory: true,
  })

  const baseStyle = {
    padding: '50px',
    margin: '10px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border 0.2s ease-in-out',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#808080',
    borderRadius: '2px',
    color: '#808080',
  }

  const activeStyle = {
    borderColor: '#2196f3',
  }

  const errorStyle = {
    borderColor: '#ff0000',
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(errorType ? errorStyle : {}),
    }),
    [isDragActive, errorType],
  )

  useEffect(() => {
    if (testFolder) {
      const filesIndexMap = new Map<string, number>()
      let ind = 0
      Array.from(testFolder).forEach((file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const fileName = file.name.split('.')[0]

            if (!filesIndexMap.has(fileName)) {
              filesIndexMap.set(fileName, ind++)
            }
          }
        }
        reader.readAsText(file)
      })
      const newInputArray: string[] = new Array(ind + 1)
      const newOutputArray: string[] = new Array(ind + 1)
      Array.from(testFolder).forEach((file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const fileContent = btoa(e.target.result.toString())
            const fileExtension = file.name.split('.').pop()
            const fileName = file.name.split('.')[0]
            const index = filesIndexMap.get(fileName)
            // console.log(file.name.split('.'))

            // console.log(fileContent)
            // console.log(atob(fileContent))
            // console.log(fileExtension)
            if (index != null && fileExtension === 'in') {
              newInputArray[index] = fileContent
            } else if (index != null && fileExtension === 'out') {
              newOutputArray[index] = fileContent
            }
          }
        }
        reader.readAsText(file)
      })
      setInputArray(newInputArray)
      setOutputArray(newOutputArray)
    }
  }, [testFolder])

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: '600px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #04364a',
        borderRadius: '10px',
      }}
    >
      {testFolder ? (
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxWidth: '550px',
            maxHeight: '600px',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Uploaded Folder
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              m: 1,
            }}
          >
            <FolderZip sx={{ fontSize: '2rem', color: '#04364a', mr: 1 }} />
            {/* <Typography variant="h4" color="primary">
              {folderName}
            </Typography> */}
          </Box>
          <Typography variant="h6" color="#2196f3">
            Click run above to test cases!
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload Cases Folder
          </Typography>
          <Typography
            variant="subtitle2"
            color="red"
            sx={{
              width: '60%',
              mb: 2,
            }}
          >
            Zip Folder structure: Each test case folder with input{' '}
            <strong>(.in)</strong> and output <strong>(.out)</strong> files.
          </Typography>
          <div {...getRootProps({ style })}>
            <input
              {...getInputProps()}
              type="file"
              directory="true"
              webkitdirectory="true"
            />
            <DriveFolderUpload sx={{ fontSize: '50px', mb: 1.5 }} />
            <Typography variant="body1" mb={1.5}>
              Drag 'n' Drop Folder Here
            </Typography>
            <Button
              sx={{
                backgroundColor: '#fafafa',
                border: '1px solid #808080',
                borderRadius: '50px',
                color: '#808080',
                mb: 1.5,
                fontSize: '16px',
              }}
            >
              Select Folder
            </Button>
          </div>
          {errorType && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'red',
                mt: 1,
              }}
            >
              <WarningAmber />
              <Typography variant="subtitle2">
                <strong>{errorText}</strong>
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}