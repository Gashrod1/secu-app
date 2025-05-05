import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";

const signUpSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
  confirmpassword: z
    .string()
    .min(6)
    .regex(new RegExp(".*[A-Z].*"))
    .regex(new RegExp(".*[a-z].*"))
    .regex(new RegExp(".*\\d.*"))
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*")),
  rememberme: z.boolean().optional(),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const toast = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: SignUpSchemaType) => {
    if (data.password !== data.confirmpassword) {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>Passwords do not match</ToastTitle>
          </Toast>
        ),
      });
      return;
    }

    try {
      const response = await fetch("https://fcs.webservice.odeiapp.fr/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          country: data.country,
        }),
      });

      if (response.ok) {
        toast.show({
          placement: "bottom right",
          render: ({ id }) => (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>Compte créé avec succès !</ToastTitle>
            </Toast>
          ),
        });
        reset();
      } else {
        const errorData = await response.json();
        toast.show({
          placement: "bottom right",
          render: ({ id }) => (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>Erreur : {errorData.message || "Inscription échouée"}</ToastTitle>
            </Toast>
          ),
        });
      }
    } catch (error) {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>Erreur réseau : {String(error)}</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="w-full" space="md">
      {/* Bouton retour */}
      <Pressable onPress={() => router.back()}>
        <Icon as={ArrowLeftIcon} className="md:hidden stroke-background-800" size="xl" />
      </Pressable>

      <VStack className="md:items-center" space="md">
        <Heading className="md:text-center" size="3xl">Sign up</Heading>
        <Text>Sign up and start using fake cloud society app</Text>
      </VStack>

      <VStack className="w-full" space="xl">
        {/* Firstname */}
        <FormControl isInvalid={!!errors.firstname}>
          <FormControlLabel>
            <FormControlLabelText>Firstname</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="firstname"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input>
                <InputField placeholder="Firstname" {...field} />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>{errors?.firstname?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Lastname */}
        <FormControl isInvalid={!!errors.lastname}>
          <FormControlLabel>
            <FormControlLabelText>Lastname</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="lastname"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input>
                <InputField placeholder="Lastname" {...field} />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>{errors?.lastname?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Country */}
        <FormControl isInvalid={!!errors.country}>
          <FormControlLabel>
            <FormControlLabelText>Country</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="country"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input>
                <InputField placeholder="Country" {...field} />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>{errors?.country?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Email */}
        <FormControl isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input>
                <InputField
                  className="text-sm"
                  placeholder="Email"
                  type="text"
                  returnKeyType="done"
                  onSubmitEditing={handleKeyPress}
                  {...field}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.email?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password */}
        <FormControl isInvalid={!!errors.password}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input>
                <InputField
                  className="text-sm"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  returnKeyType="done"
                  onSubmitEditing={handleKeyPress}
                  {...field}
                />
                <InputSlot onPress={() => setShowPassword(!showPassword)} className="pr-3">
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>{errors?.password?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Confirm Password */}
        <FormControl isInvalid={!!errors.confirmpassword}>
          <FormControlLabel>
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="confirmpassword"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input>
                <InputField
                  placeholder="Confirm Password"
                  className="text-sm"
                  type={showConfirmPassword ? "text" : "password"}
                  returnKeyType="done"
                  onSubmitEditing={handleKeyPress}
                  {...field}
                />
                <InputSlot onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="pr-3">
                  <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>{errors?.confirmpassword?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Checkbox */}
        <Controller
          name="rememberme"
          defaultValue={false}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              size="sm"
              value="Remember me"
              isChecked={value}
              onChange={onChange}
              aria-label="Remember me"
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>I accept the Terms of Use & Privacy Policy</CheckboxLabel>
            </Checkbox>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
          <ButtonText className="font-medium">Sign up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
